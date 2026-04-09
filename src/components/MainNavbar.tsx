import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {config} from "../config.ts";

const apiHost = config.apiHost;
function MainNavbar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${apiHost}/api/categories`);
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

    const getChildren = (parentId) => {
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
                    ☰
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
                                        <span className="main-navbar-arrow">⌄</span>
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
                    <Link to="/contact" className="main-navbar-action-link">
                        ◎
                    </Link>
                    <button
                        className="main-navbar-action-btn"
                        type="button"
                        aria-label="Search"
                    >
                        ⌕
                    </button>
                </div>
            </div>
        </header>
    );
}

export default MainNavbar;