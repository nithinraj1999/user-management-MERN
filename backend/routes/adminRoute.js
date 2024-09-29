import express from "express";
const adminRouter = express.Router();
import {
    authUser,getUserData,editUser,createUser,deleteUser,logoutAdmin,getSearchResult
   
  } from "../controllers/adminController.js";

  adminRouter.post("/",authUser);
  adminRouter.get("/dashboard",getUserData);
  adminRouter.post("/dashboard",getSearchResult);
  adminRouter.put("/edit",editUser);
  adminRouter.post("/create",createUser);
  adminRouter.post("/delete-user",deleteUser);
  adminRouter.post('/logout',logoutAdmin);
  export default adminRouter 