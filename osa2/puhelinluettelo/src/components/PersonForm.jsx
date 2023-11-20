const PersonForm = ({addPerson, newName, handleName, handlePhone, newPhone}) => {

  return( <>
    <form onSubmit={addPerson}>
      <div>
        name:  <input onChange={handleName} name="name" value={newName} /> <br />
        phone: <input onChange={handlePhone} name="phone" value={newPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </> )
}
export default PersonForm
