import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "./todo-list.css";
import List from "./list";

function AddTodoList(props) {
  let { id } = useParams();
  const [customers, setCustomers] = useState();
  const [customerId, setCustomerId] = useState("");
  const [input, setInput] = useState({
    customerName: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getCustomers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomers = () => {
    axios
      .get("api/todo")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setCustomers(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  const getCustomerById = () => {
    console.log("props.customerId", customerId);
    if (customerId) {
      axios
        .get(`/api/todo/${customerId}`)
        .then((res) => setInput(res.data))
        .catch((error) => {
          enqueueSnackbar(error.response.data.error);
        });
    }
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
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader
              avatar={<AccountBalanceIcon className="card-header-icon" />}
              title="Customer"
              subheader="Create and manage platform Customer."
              className="card-grid"
            />
            <CardContent></CardContent>
            <CardContent>
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
                  add
                </Form>
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default AddTodoList;
