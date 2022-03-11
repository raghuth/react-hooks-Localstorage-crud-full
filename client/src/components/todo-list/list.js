import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import AddTodoList from "./add-todo-list";

import * as Yup from "yup";

import axios from "axios";
import "./todo-list.css";

function List(props) {
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomer] = useState([]);
  const [input, setInput] = useState({
    customerName: "",
  });
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  console.log("List", id);

  useEffect(() => {
    getCustomers();
    getCustomerById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomers = () => {
    axios
      .get("api/todo")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setCustomer(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  const getCustomerById = () => {
    console.log("getCustomerById", customerId);
    if (customerId) {
      axios
        .get(`/api/todo/${customerId}`)
        .then((res) => setInput(res.data))
        .catch((error) => {
          enqueueSnackbar(error.response.data.error);
        });
    }
  };

  const deleteCustomer = () => {
    axios.delete(`api/delete/${customerId}`).catch((error) => {
      enqueueSnackbar(error.response.data.error);
    });
    getCustomers();
  };

  const handleSubmit = () => {
    // if (input.customerName.trim().length === 0) return;
    const newCustomerList = {
      name: input.customerName,
    };

    axios
      .post("api/todo/create", newCustomerList, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        getCustomers();
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };
  const editCustomer = (id) => {
    setCustomerId(id);
  };

  return (
    <>
      {/* <AddTodoList customerId={customerId} customers={id} /> */}
      <Formik
        initialValues={{ customerName: input.customerName }}
        validationSchema={Yup.object({
          customerName: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submit", values);
          Object.assign(input, values);
          handleSubmit();
          setSubmitting(false);
        }}
      >
        <Form className="helpGrid">
          <Grid justifyContent="space-between" container>
            <Grid justifyContent="space-between" container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">NAME</Typography>
                <Field
                  name="customerName"
                  as={TextField}
                  fullWidth
                  style={{ marginBottom: 40 }}
                  autoFocus={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid justifyContent="flex-end" container>
            <Button type="submit" color="primary" variant="contained">
              SAVE
            </Button>
          </Grid>
        </Form>
      </Formik>
      {customers?.map((data, i) => (
        <Grid container justifyContent="flex-end" key={i}>
          <Grid item xs={10}>
            {data.name}
          </Grid>
          <Grid item xs={2}>
            <EditIcon
              className="point"
              onClick={() => {
                editCustomer(data._id || "");
              }}
            />
            <DeleteIcon
              className="point"
              onClick={() => {
                deleteCustomer(data._id || "");
              }}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default List;
