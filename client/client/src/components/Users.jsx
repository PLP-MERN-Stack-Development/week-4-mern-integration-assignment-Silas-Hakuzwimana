import UserList from './UserList';
import AddUser from './AddUser';

export default function Users() {
  return (
  <>
  <h2 className="text-xl font-semibold">Users Management</h2>
  <button onClick={<AddUser/>}></button>
  <UserList />
    </>
  );
}