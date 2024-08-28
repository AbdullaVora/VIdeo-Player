const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Videomodel = require('../models/progressModel');
const secret_key = 'Your_Secret_Key';


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, name: user.email }, secret_key, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error(error);
    }
};

const VideoPlay = async (req, res) => {
    try {
        const { totalPlayVideo, lastWatchedTime } = req.body;

        let videoData = await Videomodel.findOne(); 

        if (videoData) {
            if (totalPlayVideo) {
                videoData.totalPlayVideo = totalPlayVideo;
            }
            if (lastWatchedTime) {
                videoData.lastWatchedTime = lastWatchedTime;
            }
            await videoData.save();
            res.status(200).json({ message: 'Video progress updated successfully' });
        } else {
            let newVideoData = new Videomodel({ totalPlayVideo, lastWatchedTime });
            await newVideoData.save();
            res.status(201).json({ message: 'Video progress saved successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const getData = async (req, res) => {
    try {
        const VideoData = await Videomodel.find();
        res.status(200).json(VideoData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error(error);
    }
}

module.exports = { signUp, login, VideoPlay, getData };
