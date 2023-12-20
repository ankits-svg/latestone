const mongoose=require("mongoose")

const rankSchema=mongoose.Schema({
    name: String,
    course: String,
    type:String,
    linkedin: String,

})

const RankModel=mongoose.model("rank",rankSchema)

module.exports={
    RankModel
}