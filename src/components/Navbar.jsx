const { default: Link } = require("next/link");

const Navbar = () => {
  return (
    <nav className="flex justify-end space-x-4 p-4 bg-blue-400">
      <Link href="/profile">
        <span className="cursor-pointer">Profile</span>
      </Link>
      <Link href="/login">
        <span className="cursor-pointer">Login</span>
      </Link>
    </nav>
  );
};

export default Navbar;
