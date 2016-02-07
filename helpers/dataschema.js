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

            name: String,
            price: Number
        }

        return schema;
    }

    this.list = function () {

        var schema = {

            name: String,
            createDate: Date,
            owner: String,
            isPublic: Boolean,
            isDraft: Boolean,
            items: [this.listitem()]
        }

        return schema;
    }


}