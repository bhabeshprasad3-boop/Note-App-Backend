const jwt = require("jsonwebtoken");
const noteModel = require("../models/notes.model");
const { userInfo } = require("node:os");


//Create Notes
async function uploadNote(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Can't be empty",
      });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized : No token Provided",
      });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    const notes = await noteModel.create({
      title,
      description,
      userId,
    });

    return res.status(201).json({
      message: "Note created successfully",
      note: {
        title: notes.title,
        description: notes.description,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//Show Notes
async function getNotes(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;

      if (!decoded) {
        return res.status(401).json({
          message: "Unauthorized Access",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "Not Valid Id",
      });
    }

    const showNote = await noteModel.find({
      userId: userId,
    });

    res.status(200).json({
      message: "Notes fetched successfully",
      showNote: showNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//Delete Note
async function deleteNote(req, res) {
  try {
      const id = req.params.noteId;

  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  let userId;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  userId = decoded.userId;

  const deleteNote = await noteModel.findOneAndDelete({
    _id: id,
    userId: userId,
  });

    if(!deleteNote){
      return res.status(404).json({
        message: "Note not found"
      });
    }

  return res.status(200).json({
    message: "Note delted successfully",
    deleteNote,
  });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//Update note
async function updateNote(req, res) {
  try {
      
    const id= req.params.noteId;
    const {title,description} = req.body;

    const token = req.cookies.token;

    if(!token){
      return res.status(400).json({
        message: "Unauthorized",
      });
    }
      let userId
     try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      userId= decoded.userId
     }catch(error){
      return res.status(400).json({
        message: "Unauthorized",
      });
     }

     const noteUpdated = await noteModel.findOneAndUpdate({_id:id,userId:userId},
      {title,description},
      {new:true}
     )

     if (!noteUpdated) {
      return res.status(404).json({ message: "Note not found" });
    }

     return res.status(200).json({
       message: "Note update successfully",
      noteUpdated
     });







  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = { uploadNote, getNotes,deleteNote,updateNote };
