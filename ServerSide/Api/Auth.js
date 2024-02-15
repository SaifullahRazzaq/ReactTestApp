const express = require("express");
const User = require("../model/user");
const app = express();
const bcrypt = require('bcrypt');
const { emailRegexp } = require("../validate/index");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const user = require("../model/user");
var multer = require("multer");

app.use(express.json());

//Register Api
app.post("/Register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!emailRegexp.test(email)) {
            res.status(400).send({ message: "Invalid Email Address" });
        } else if (!email) {
            res.status(400).send("Email Address is required");
        }
        let user = {};
        const oldUser = await User.find({ email: email });
        console.log("oldUJser-====>", oldUser);
        if (oldUser.length > 0) {
            res.status(400).send({ message: "Email Address already registered" });
        } else {
            encryptedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                profileImage: null,
            });
        }

        // Create token
        // const token = jwt.sign(
        //   { user_id: user._id, email },
        //   process.env.TOKEN_KEY,
        //   {
        //     expiresIn: "6h",
        //   }
        // );
        // // save user token
        // user.token = token;

        // return new user
        return res.status(200).send({
            message: "User Registered Successfully",
            data: res.status(200).json({ data: user }),
        });
    } catch (err) { }
});

app.post("/Login", async (req, res) => {
    try {
        console.log("req", req.body);
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email: email });
        console.log("pass", password, user);
        console.log("user--<", user, bcrypt.compare(password, user.password));
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            return res.status(200).json({ data: user });
        }
        res.status(400).json({ message: "Invalid Credentials" });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

// getAllUser

app.get("/getAllUser", async (req, res) => {
    try {
        const AllUser = await User.find();
        return res.send({
            message: "Success",
            data: res.status(200).json({ data: AllUser }),
        });
    } catch (error) {
        res.status(400).send({ message: "No User Found" });
    }
});
//getUserById
app.get("/getAllUserById/:id", async (req, res) => {
    try {
        console.log("params====>", req?.params?.id);
        const user = await User.findById({ _id: req.params?.id });
        return res.status(200).json({ message: "User Found", data: user });
        // res.setHeader('')
    } catch (error) {
        return res.status(400).send({ message: "No User Found" });
    }
});
//deleteUser
app.delete("/deleteUserById/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params?.id });
        console.log("delete user===>", user);
        return res
            .status(200)
            .json({ message: "User delete successfully", data: user });
    } catch (error) {
        return res.status(400).send({ message: "No User Found" });
    }
});

//ChangePassword
app.post("/ChangePassword/:id", async (req, res) => {
    try {
        const currentPassword = req?.body?.currentPassword;
        const changePassword = req?.body?.changePassword;
        const user = await User?.findById({ _id: req?.params?.id });
        // console.log("user---<",user)
        // const convertIntoHash = bcrypt.hash(changePassword, 10);
        await bcrypt.compare(
            currentPassword,
            user.password,
            function (error, success) {
                if (error) {
                    console.log("error");
                    res.status(400).send({ message: "Invalid " });
                    return;
                }
            }
        );

        user.password = await bcrypt.hash(changePassword, 10);
        user
            .save()
            .then((response) => {
                return res.status(200).send({
                    message: "Change Password Successfully",
                    data: user,
                });
            })
            .catch((error) => {
                return res.status(400).send({ message: error.message });
            });
    } catch (error) {
        return res.status(400).send({ message: "Please Enter Valid Credentials" });
    }
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });
app.use("/uploads", express.static("./uploads"));

app.post(
    "/UpdateProfile/:id",
    verifyToken,
    upload.single("file"),
    async (req, res) => {
        const { first_name, last_name, email } = req?.body;
        console.log(req?.body);
        const image = req?.file?.filename;
        // let updateUser = {
        //   first_name: first_name,
        //   last_name: last_name,
        //   email: email,
        //   profileImage: image,
        // };
        const user = await User.findById({
            _id: req?.params?.id,
            // updateUser,
        });
        console.log("user=====<", user);
        user.first_name = first_name;
        (user.last_name = last_name),
            (user.email = email),
            (user.profileImage = image),
            user
                .save()
                .then((response) => {
                    return res
                        .status(200)
                        .send({ message: "Profile Update Successfully", data: user });
                })
                .catch((error) => {
                    return res.status(400).send({ message: error?.message });
                });
    }
);

app.post("/SupportContact", async (req, res) => {
    const { email, message } = req.body;
    console.log("req===>", req?.body)
    try {
        if (email && message) {
            return res.status(200).send({
                message:
                    "Thankyou for contact to support.We will contact you on your email thankyou",
            });
        } else {
            return res.status(400).send({ message: "Something Wrong" });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
module.exports = app;