const router = require("express").Router();
let Event = require("../models/event");

//add a new event
router.route("/add").post((req, res) => {
    const title = req.body.title;
    const eventType = req.body.eventType;
    const description = req.body.description;
    const newEvent = new Event({
        title,
        eventType,
        description
    })
    newEvent.save().then(() => {
        res.json("Event Added")
    }).catch((err) => {
        console.log(err);
    })
})

//get all events
router.route("/all").get((req, res) => {
    Event.find().then((events => {
        res.json(events)
    })).catch((err) => {
        console.log(err)
    })
})

//update events
router.route("/update/:id").put(async (req, res) => {
    let eventId = req.params.id;
    const { title, eventType, description } = req.body;
    const updateEvent = {
        title,
        eventType,
        description,
    }
    const update = await Event.findByIdAndUpdate(eventId, updateEvent).then(() => {
        res.status(200).send({ status: "Event updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    })
})

//delete an event
router.route("/delete/:id").delete(async (req, res) => {
    let eventId = req.params.id;
    await Event.findByIdAndDelete(eventId).then(() => {
        res.status(200).send({ status: "Event deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete ", eventerror: err.message });
    })
})

//get event by ID
router.route("/get/:id").get(async (req, res) => {
    let eventId = req.params.id;
    const eventDetails = await Event.findById(eventId).then((event) => {
        res.status(200).send({ status: "Event fetched", event });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get data'", error: err.message });
    })
})

// get eventdetails using event name
router.route("/getproposal/:title").get((req, res) => {
    let title = req.params.title;
    Event.find({ title: title }).then((event) => {
        res.json(event)
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router;
