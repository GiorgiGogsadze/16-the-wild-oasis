import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import { Menu } from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    // description,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Modal>
        <Menu>
          <Menu.Toggle id={cabinId} />
          <Menu.List id={cabinId}>
            <Modal.Open opens="cabin-edit-form">
              <Menu.Button>
                <HiPencil /> <span>Edit</span>
              </Menu.Button>
            </Modal.Open>
            <Modal.Open opens="confirm-delete">
              <Menu.Button>
                <HiTrash /> <span>Delete</span>
              </Menu.Button>
            </Modal.Open>
          </Menu.List>
          <Modal.Window name="cabin-edit-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={() => deleteCabin({ cabinId, image })}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menu>
      </Modal>
    </Table.Row>
  );
}
