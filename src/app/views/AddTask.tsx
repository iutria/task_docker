import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { Task } from "../models/Task";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { LuPaintBucket } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa";

const AddTask = () => {
  const params = useParams();

  const refColor = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const url: string = import.meta.env.VITE_API;

  const handleSubmmit = async (values: Task) => {
    let resp = {};
    if (params.id) {
      resp = await axios.put(`${url}/${params.id}`, values);
    } else {
      resp = await axios.post(url, values);
    }
    alert(JSON.stringify(resp));
  };

  const handleValidate = (values: Task) => {
    const errors: any = {};

    if (values.title.length == 0) {
      errors.title = "Debe ingresar un titulo";
    }

    if (values.description.length == 0) {
      errors.description = "Debe ingresar una descripcion";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      description: "",
      color: "#000",
    },
    onSubmit: handleSubmmit,
    validate: handleValidate,
    validateOnChange: false,
  });

  const getTask = async () => {
    const resp = await axios.get(`${url}/${params.id}`);
    formik.setValues(resp.data);
  };

  useEffect(() => {
    params.id && getTask();
  }, []);

  return (
    <Container css={{ paddingTop: "$20" }}>
      <Card variant="bordered">
        <Card.Header>
          <Button onPress={() => navigate("/")} icon={<FaAngleLeft />} auto />
          <Spacer width={10} />
          <Text h2>{params.id ? "Editar" : "Agregar"} Tarea</Text>
        </Card.Header>
        <Card.Body>
          <form onSubmit={formik.handleSubmit}>
            <Grid.Container gap={1}>
              <Grid>
                <Input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  bordered
                  labelPlaceholder="Titulo"
                  color={formik.errors.title ? "error" : "default"}
                  helperText={formik.errors.title}
                  status={formik.errors.title ? "error" : "default"}
                />
              </Grid>
              <Grid>
                <Input
                  ref={refColor}
                  css={{ display: "none" }}
                  name="color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  bordered
                  type="color"
                  labelPlaceholder="Color"
                  color="default"
                />
                <Button
                  shadow
                  style={{ background: formik.values.color }}
                  icon={<LuPaintBucket />}
                  onPress={() => refColor.current!.click()}
                  auto
                />
              </Grid>
              <Grid sm={12} css={{ marginTop: "50px" }}>
                <Textarea
                  css={{ width: "100%" }}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  bordered
                  labelPlaceholder="Descripción"
                  color="default"
                />
              </Grid>
            </Grid.Container>
            <Spacer />
            <Button type="submit">Guardar</Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddTask;
