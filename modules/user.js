const user = {
    name: "Tom",
    Phome: "0900000000",
}

exports.getName = function(){
    return user.name;
};

exports.setName = function (name) {
    if (name == "Mary" || name == "Jom") {
      user.name = name;
    }
}