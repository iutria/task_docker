import { Divider, Modal, Text } from "@nextui-org/react";
import { useTaskModal } from "../states/useModalDetail";

const DetailsTask = () => {
  const { body: task, visible, closeModal } = useTaskModal();
  return (
    task && (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeModal}
        blur
        css={{ border: `3px solid ${task.color}` }}
      >
        <Modal.Header>
          <Text h2>{task!.title}</Text>
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <Text>{task!.description}</Text>
        </Modal.Body>
      </Modal>
    )
  );
};

export default DetailsTask;
