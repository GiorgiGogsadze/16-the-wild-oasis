import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

//if there is Id, we edit cabin, if not create new one
export async function addOrEditCabin(newCabin, id, editImageUrl) {
  const finalCabin = { ...newCabin };
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replace("/", "");
  if (newCabin.image) {
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    finalCabin.image = imagePath;
  }
  let query = supabase.from("cabins");
  //1)upload cabin
  if (!id) query = query.insert([finalCabin]);
  else {
    if (newCabin.image) deleteCabinImage(editImageUrl);
    query = query.update(finalCabin).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${id ? "edited" : "added"}`);
  }

  if (!newCabin.image) return data;

  //2)upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3)Delete cabin and throw error if image could not upload
  if (storageError) {
    deleteCabin({ cabinId: data.id });
    console.error(storageError);
    throw new Error(`Cabin Image could not be uploaded`);
  }
  return data;
}

export async function deleteCabin(cabinId, image) {
  // 1) delete cabin
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted`);
  }
  // 2) if image is provided as argument delete it
  if (image) deleteCabinImage(image);
}

async function deleteCabinImage(image) {
  const imageName = image.split("/").at(-1);

  const { error: imgDelError } = await supabase.storage
    .from("cabin-images")
    .remove([imageName]);
}
