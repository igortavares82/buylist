var mongoose = require('mongoose');

module.exports = function () {

    this.account = function () {

        var schema = {

            name: String,
            birth: Date,
            email: String,
            isActive: Boolean,
            username: { type: String, required: true, unique: true },
            password: { type: String, required: true }
        }

        return schema;
    }

    this.listitem = function () {

        var schema = {

            name: { type: String, required: true },
            price: { type: Number, required: true }
        }

        return schema;
    }

    this.list = function () {

        var schema = {

            name: { type: String, required: true },
            createDate: Date,
            account: { type : mongoose.Schema.Types.ObjectId, ref : 'Account' },
            isPublic: Boolean,
            isDraft: Boolean,
            items: [{ type : mongoose.Schema.Types.ObjectId, ref : 'ListItem' }]
        }

        return schema;
    }


}