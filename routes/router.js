import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import database from "../database.js";
import registerValidation  from "../models/Schema.js";
import { ObjectId } from "mongodb";

const router = express.Router()

router.get('/',(req,res) => {
    database
    .connection()
    .collection("customers")
    .find({})
    .toArray()
    .then((data) => {
      return res.send(data).status(200);
    });
})

router.get('/:name',(req,res) => {
    const name = req.params.name
    database
    .connection()
    .collection("customers")
    .find({name: name})
    .toArray()
    .then((data) => {
      return res.send(data).status(200);
    });
})

router.post('/', async (req,res) => {
        const {error} = registerValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const name = {name: req.body.name, age: req.body.age, password: hashedPassword}

        database
        .connection()
        .collection("customers")
        .insertOne(name)
        .then(() => {
          database
            .connection()
            .collection("customers")
            .find({})
            .toArray()
            .then((data) => {
              if (data) {
                return res.send(data).status(201);
              } else {
                return res.sendStatus(400);
              }
            });
           
        }); 
})

router.post('/login', async (req, res) => {
    try {
         if (await bcrypt.compare(req.body.password, customer.password)){
            res.redirect('Success')
         } else {
             return res.status(403).send('Not Allowed')
         }
    } catch {
        res.status(500).send
    }
    
})


router.put('/:_id',(req,res) => {
    database
    .connection()
    .collection("customers")
    .updateOne(
      {
        _id: ObjectId(req.params._id),
      },
      {
        $set: req.body,
      }
    )
    .then(() => {
      database
        .connection()
        .collection("customers")
        .find({})
        .toArray()
        .then((data) => {
          if (data) {
            return res.send(data).status(201);
          } else {
            return res.sendStatus(400);
          }
        });
    });
})

router.delete('/:name',(req,res) => {
    database
    .connection()
    .collection("customers")
    .deleteOne({
      _id: ObjectId(req.params.id),
    })
    .then(() => {
      database
        .connection()
        .collection("customers")
        .find({})
        .toArray()
        .then((data) => {
          return res.send(data).status(200);
        });
    });
})

router.put('/', (req,res) => {
    database
    .connection()
    .collection("customers")
    .updateOne(
      {
        _id: ObjectId(req.body._id),
      },
      {
        $set: {
          ordername: req.body.ordername,
          orderprice: req.body.orderprice,
          status: req.body.status,
          stock: req.body.stock,
        },
      }
    )
    .then(() => {
      database
        .connection()
        .collection("customers")
        .find({})
        .toArray()
        .then((data) => {
          if (data) {
            return res.send(data).status(201);
          } else {
            return res.status(400);
          }
        });
    });
})

export default router
