import { NextRequest, NextResponse } from "next/server";
import User from "../models/User";
import Post from "../models/Post";
import { v2 as cloudinary } from "cloudinary";