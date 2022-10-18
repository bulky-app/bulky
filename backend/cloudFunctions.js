// When you update this file please also update on Back4app vise-vesa

// Update User table/class
Parse.Cloud.define("editUserProperty", async (request) => {
  const { objectId, name, surname, phone } = request.params;
  const User = Parse.Object.extend(Parse.User);
  const query = new Parse.Query(User);
  const result = await query.get(objectId, { useMasterKey: true });
  if (!result) new Error("No user found!");

  result.set("name", name);
  result.set("surname", surname);
  result.set("phone", phone);
  try {
    result.save(null, { useMasterKey: true });
    return true;
  } catch (e) {
    return e.message;
  }
});

// Update User balance
//Example:  https:// :
//          javascript-key=
//          @bulky.b4a.app/
//          functions/
//          updateUserBalance?
//          objectId=
//          &balance=
//          &deposit=

Parse.Cloud.define("updateUserBalance", async (request) => {
  const { objectId, balance, deposit } = request.params;

  const User = Parse.Object.extend(Parse.User);
  const query = new Parse.Query(User);
  const result = await query.get(objectId, { useMasterKey: true });
  if (!result) new Error("No user found!");

  const newBalance = parseFloat(Number(deposit) + Number(balance));
  result.set("balance", newBalance);
  try {
    result.save(null, { useMasterKey: true });
    return true;
  } catch (e) {
    return e.message;
  }
});

// Get user data
Parse.Cloud.define("getUserDetails", async (request) => {
  const { objectId } = request.params;
  const User = Parse.Object.extend(Parse.User);
  const query = new Parse.Query(User);

  try {
    let result = await query.get(objectId, { useMasterKey: true });
    return result;
  } catch (e) {
    return e.message;
  }
});
