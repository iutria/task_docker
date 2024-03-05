import { useEffect } from "react";
import axios from "axios";
import { Button, Container, Spacer, Table } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaEye, FaPlus } from "react-icons/fa";
import { useTask } from "../states/useTask";
import DetailsTask from "./DetailsTask";
import { useTaskModal } from "../states/useModalDetail";

const TaskList = () => {
  const navigate = useNavigate();

  const { getTasks, list } = useTask();
  const { openModal } = useTaskModal();

  const url = import.meta.env.VITE_API;

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${url}/${id}`);
      alert("Eliminado");
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container css={{ paddingTop: "$10" }}>
      <DetailsTask />
      <Button
        icon={<FaPlus />}
        onPress={() => navigate("/add")}
        shadow
        color="primary"
        auto
      >
        Agregar Tarea
      </Button>
      <Spacer />
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Acciones</Table.Column>
          <Table.Column>Id</Table.Column>
          <Table.Column>Titulo</Table.Column>
          <Table.Column>Descripción</Table.Column>
          <Table.Column>Color</Table.Column>
        </Table.Header>
        <Table.Body>
          {list.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell css={{ dflex: "flex-start", gap: "$5" }}>
                <Button
                  onPress={() => deleteTask(item.id!)}
                  icon={<RiDeleteBin5Line />}
                  color="error"
                  auto
                />
                <Button
                  icon={<HiOutlinePencilSquare />}
                  onPress={() => navigate(`/edit/${item.id}`)}
                  auto
                />
                <Button
                  color="success"
                  icon={<FaEye />}
                  onPress={() => {
                    openModal(item);
                  }}
                  auto
                />
              </Table.Cell>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>
                <Container
                  css={{
                    background: item.color,
                    width: "25px",
                    height: "25px",
                    borderRadius: "$xs",
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default TaskList;
