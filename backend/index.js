const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = 9999;

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

mongoose.set('useFindAndModify', false);

const TOKEN_SECRET = "lacasadepapel";

const db = mongoose.createConnection("mongodb://localhost:27017/my-project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

console.log("Database connected");

const questionSchema = new mongoose.Schema({
    question: {
        title: String,
        quesBody: String,
        tags: [String],
        postedBy: String,
        postedOnDate: String,
    },
    answers: [{
        ans: String,
        votes: Number,
        answeredBy: String,
        answeredOnDate: String,
    }],
});

const userModel = db.model('user', userSchema);
const questionModel = db.model("question", questionSchema);

const isNullorUndefined = (val) => val === null || val === undefined;

const authMiddleWare = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(token === "null") {
        res.status(401).send({ auth: false, err: "Token error/Not loggedIn" });
    } else {
        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).send({
                    auth: false,
                    err:"Failed to authenticate"
                });
            } else {
                req.id = decoded.id;
                next();
            }
        });
    }
};

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if(isNullorUndefined(existingUser)) {
        res.status(401).send( { err: "User does not exists." });
    } else {
        const hashedPwd = existingUser.password;
        if(bcrypt.compareSync(password, hashedPwd)) {
            const token = jwt.sign({id: existingUser._id}, TOKEN_SECRET, {expiresIn: 60 * 60});
            res.status(200).send({
                auth: true,
                message:"LoggedIn Successfully",
                token
            });
        } else {
            res.status(401).send( { err: "Password Incorrect" });
        }
    }
});

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if(isNullorUndefined(existingUser)) {
        try {
            const hashedPwd = bcrypt.hashSync(password, 10);
            const newUser = userModel({ firstName, lastName, email, password: hashedPwd });
            await newUser.save();
            res.status(201).send( { success: "SignedUp Successfully" });
        } catch(e) {
            console.log(e);
        }
    } else {
        res.status(401).send({ err: "Email already exists." });
    }
});

app.post('/post-question', authMiddleWare, async (req, res) => {
    const { title, quesBody, tags, userName} = req.body;
    const newQues = await questionModel({
        question: { 
            title, 
            quesBody, 
            tags,
            postedBy: userName,
            postedOnDate: new Date().toLocaleDateString(), 
        }
    });
    await newQues.save();
    res.status(201).send(newQues);
});

app.get('/all-questions', authMiddleWare, async (req, res) => {
    const allData = await questionModel.find({});
    res.status(200).send(allData);
});

app.get('/solve-question', authMiddleWare, async (req, res) => {
    const quesId = req.query.id;
    const currQues = await questionModel.findById(quesId);
    res.status(200).send(currQues);
});

app.post('/solve-question', authMiddleWare, async (req, res) => {
    const quesId = req.query.id;
    const{ ansBody, userName } = req.body;
    await questionModel.findByIdAndUpdate(quesId, { $push: { answers: { 
        ans: ansBody, 
        votes: 0, 
        answeredBy: userName,
        answeredOnDate: new Date().toLocaleDateString(),
    }}});
    const currQues = await questionModel.findById(quesId);
    res.status(200).send(currQues);
});

app.post('/update-votes', authMiddleWare,  async (req, res) => {
    const quesId = req.query.qid;
    const ansId = req.query.aid;
    const vote = req.query.vote;
    const currQues = await questionModel.findById(quesId);
    for(let i = 0; i < currQues.answers.length; i++) {
        if(currQues.answers[i]._id == ansId) {
            if(vote === "up") {
                currQues.answers[i].votes += 1;    
            } else {
                currQues.answers[i].votes -= 1;
            }
            break;
        }
    }
    await currQues.save();
    res.status(200).send(currQues);
});

app.get('/userinfo', authMiddleWare, async (req, res) => {
    const user = await userModel.findById(req.id);
    res.send({ auth: true, userName: `${user.firstName} ${user.lastName}` });
});

app.get('/logout', (req, res) => {
    if(!isNullorUndefined(req.id)) {
        req.id = null;
    }
    res.sendStatus(200);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));