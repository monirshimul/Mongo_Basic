const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testingDb',{ useNewUrlParser: true })
    .then(() => console.log('Connceted to mongoDB.....'))
    .catch(err => console.log('Could not connected to mongodb...', err));

//Creating DB schema============================
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean

});

// Creating model, class, object, construction function to give value to database=================
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Java Script(OOP)',
        author: 'Mr. Mosh Hamedani',
        tags: ['JS', 'backend'],
        price: 112,
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}
//createCourse();

async function getCourses() {
    const courses = await Course
        //.find({ author: 'Mosh', isPublished: true })
        //.find({ price:{$gt:10, $lt:17} })
        //.find({ price:{ $in:[15,17] } })
        /*
        //Logical Operator==========================
        .find()
        .or([{author:'Mosh'},{isPublished:true}])
        */
        //Regular Expression========================
        //Starts with Mosh.......
        //.find({ author:/^Mosh/ })
        //Ends with Hamedani.....
        //.find({ author:/hamedani$/i })
        //Contains Mosh
        .find({ author: /.*mosh.*/i })


        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, author: 1, price: 1 });
    //.count();
    console.log(courses);
}

//getCourses();



//Updating Course=======================================================
async function updateCourse(id) {
    const course = await Course.findById(mongoose.Types.ObjectId(id));
    //if (!course) return;
    //    course.set({
    //        isPublished: true,
    //        author : 'monir shimul'
    //    });
    course.isPublished = true;
    course.author = 'monir';
    const result = await course.save();
    console.log(result);



}

//updateCourse('5c3bf1e8c747e222603efdea');


//Another Update to the database=============================
async function anotherUpdate(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Jalal/Jamil'
        }
    },{ new: true });
    console.log(course);
}
//anotherUpdate('5c3bf1e8c747e222603efdea');


//Remove from database=======================
async function removeData(id){
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}
removeData('5c3bf1e8c747e222603efdea');


