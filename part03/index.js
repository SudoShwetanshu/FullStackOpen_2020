require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const app = express()

morgan.token('data', (req, res) => {
  const { body } = req
  return JSON.stringify(body)
})

app.use(express.static('build'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)
app.use(cors())
app.use(bodyParser.json())

app.get('/api/persons', (request, response) => {
  Person.find({}).then(ps => { response.json(ps) })
})

app.get('/info', (request, response, next) => {
  Person.estimatedDocumentCount({})
    .then(personCount => {
      response.send(
        `<p>Phonebook has info for ${personCount} people.</p>` +
                '<br>' +
                `<p>${new Date()}<p>`
      )
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(p => {
    if (p) {
      response.json(p)
    } else { response.status(404).end() }
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(p => {
    response.json(p)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.error(error)
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findOneAndUpdate({ _id: request.params.id }, { number: request.body.number }, {
    new: true, runValidators: true
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((err) => {
      next(err)
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(`${error.message}`)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(406).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
