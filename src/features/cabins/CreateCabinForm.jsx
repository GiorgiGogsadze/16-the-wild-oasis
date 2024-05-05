import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useAddOrEditCabin } from "./useAddOrEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, image: editImage, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isUplodaing, addOrEditCabin } = useAddOrEditCabin();

  function onSubmit(data) {
    const { name, maxCapacity, regularPrice, discount, description, image } =
      data;
    const newCabin = {
      name,
      maxCapacity: +maxCapacity,
      regularPrice: +regularPrice,
      discount: +discount,
      description: description,
    };
    if (image) newCabin.image = image[0];
    addOrEditCabin(
      {
        newCabin,
        id: isEditSession && editId,
        editImageUrl: isEditSession && editImage,
      },
      {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow errMessage={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          disabled={isUplodaing}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        errMessage={errors?.maxCapacity?.message}
        label="Maximum capacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isUplodaing}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow errMessage={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          disabled={isUplodaing}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 0, message: "Price can't be negative" },
          })}
        />
      </FormRow>

      <FormRow errMessage={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          disabled={isUplodaing}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: { value: 0, message: "discount can't be negative" },
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount shouldn't be more than regular price",
          })}
        />
      </FormRow>

      <FormRow
        errMessage={errors?.description?.message}
        label="Description for website"
      >
        <Textarea
          type="number"
          id="description"
          disabled={isUplodaing}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errMessage={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isUplodaing}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isUplodaing}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isUplodaing}>
          {isEditSession ? "Edit" : "Add"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
