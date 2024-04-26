import express from 'express'
import { Comment } from '../models/comment.model.js'
import { postComment } from '../controllers/comment.controller.js'

const router = express.Router()

router.post("/comment",postComment)
