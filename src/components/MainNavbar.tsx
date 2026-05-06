import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiChevronDown, FiInstagram, FiMenu, FiMoon, FiSearch } from "react-icons/fi";
import {config} from "../config.ts";

type Category = {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
};

const rawApiHost = (config.apiHost || "http://localhost:4001").replace(/\/$/, "");
const apiHost = rawApiHost.endsWith("/api") ? rawApiHost : `${rawApiHost}/api`;
const fallbackCategories: Category[] = [
    { id: 1, name: "Places", slug: "places", parent_id: null },
    { id: 2, name: "Seoul", slug: "seoul", parent_id: 1 },
    { id: 3, name: "Busan", slug: "busan", parent_id: 1 },
    { id: 4, name: "K-Food", slug: "k-food", parent_id: null },
    { id: 5, name: "Travel Tips", slug: "travel-tips", parent_id: null },
    { id: 6, name: "About", slug: "about", parent_id: null },
    { id: 7, name: "Contact", slug: "contact", parent_id: 6 },
];

function MainNavbar() {
    const [categories, setCategories] = useState<Category[]>(fallbackCategories);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${apiHost.replace(/\/$/, "")}/categories`);
                const result = await res.json();

                if (result.success) {
                    setCategories(result.data);
                }
            } catch (err) {
                console.error("카테고리 불러오기 실패", err);
            }
        };

        fetchCategories();
    }, []);

    const parentCategories = categories.filter(
        (category) => category.parent_id === null
    );

    const getChildren = (parentId: number) => {
        return categories.filter((category) => category.parent_id === parentId);
    };

    return (
        <header className="main-navbar">
            <div className="site-container main-navbar-inner">
                <button
                    className="main-navbar-icon-btn"
                    type="button"
                    aria-label="Open menu"
                >
                    <FiMenu />
                </button>

                <nav className="main-navbar-menu">
                    {parentCategories.map((parent) => {
                        const children = getChildren(parent.id);

                        return (
                            <div className="main-navbar-item" key={parent.id}>
                                <Link to={`/category/${parent.slug}`} className="main-navbar-link">
                                    {parent.name}
                                </Link>

                                {children.length > 0 && (
                                    <>
                                        <span className="main-navbar-arrow">
                                            <FiChevronDown />
                                        </span>
                                        <div className="main-navbar-dropdown">
                                            {children.map((child) => (
                                                <Link
                                                    key={child.id}
                                                    to={`/category/${child.slug}`}
                                                    className="main-navbar-dropdown-link"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}                </nav>

                <div className="main-navbar-actions">
                    <Link to="/contact" className="main-navbar-action-link" aria-label="Instagram">
                        <FiInstagram />
                    </Link>
                    <button className="main-navbar-action-btn" type="button" aria-label="Dark mode">
                        <FiMoon />
                    </button>
                    <button
                        className="main-navbar-action-btn"
                        type="button"
                        aria-label="Search"
                    >
                        <FiSearch />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default MainNavbar;
