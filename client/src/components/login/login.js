import React, { useEffect ,useState,useContext } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
//import { UserBean } from "./user.bean";
import { UserService } from "../service/user.service";


function Login() {
  let userService = new UserService();
  let navigate = useNavigate();
  const { Username, setUsername } = useState("");
  const { Password, setPassword } = useState("");  
  useEffect(() => {  
    let userData = localStorage.getItem('login user');    
  }, []);

  // const getUsers = () => {
  //     userService.getAllUsers().then((data) => {
  //       console.log("getAll users",data);
  //     });  
  // }

  const handleSubmit = (fields) => {   
    if (!fields.Username || fields.Password.trim().length === 0) return;   
    localStorage.setItem('login user',JSON.stringify(fields, null, 2));
    navigate("./home")    
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ Username: "", Password: "" }}
        // validationSchema={Yup.object({
        //   Username: Yup.string().required("Required"),
        //   Password: Yup.string().required("Required"),
        // })}
        onSubmit={(fields, { setSubmitting }) => {         
          // Object.assign(clientBean, fields);
          handleSubmit(fields);
          setSubmitting(false);
        }}
      >
        <Form >
          <Grid
           container
           spacing={0}          
           alignItems="center"
           justifyContent="center"
           style={{ minHeight: '80vh' }}           
          >
            <Grid item xs={4} style={{ display: "grid" }}>
              <Field
                name="Username"              
                as={TextField}
                autoFocus={true}
                label="Username"
                variant="outlined"
                placeholder="Username"
                
              />
              <Field
                name="Password"              
                as={TextField}
                autoFocus={true}
                label="Password"
                variant="outlined"
                placeholder="Password"
                style={{ marginTop: 24 }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                style={{ marginTop: 24 }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
