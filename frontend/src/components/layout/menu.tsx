import { Home, PackageSearch } from "lucide-react";
import Link from "next/link";

const Menu = () => {
  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Products",
      url: "/products",
      icon: PackageSearch,
    },
  ];
  return (
    <nav>
      <ul className="flex gap-5 mr-5">
        {menuItems.map((item) => (
          <li
            key={item.title}
            className="hover:underline decoration-solid transition duration-150 ease-in-out"
          >
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
