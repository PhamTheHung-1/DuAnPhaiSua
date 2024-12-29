import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../JS/bookServices";
import { useNavigate } from "react-router-dom";

const BookLists = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("A-Z"); // Thêm trạng thái sắp xếp

  const booksPerPage = 24;
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await getAllBooks();
    setBooks(data);
  };

  const categories = [
    "Tất cả",
    "Light Novel",
    "Manga - Comic",
    "Tâm Lý - Kỹ năng sống",
    "Kinh tế",
    "Huyền Bí - Giả Tưởng - Kinh Dị",
    "Truyện tranh",
    "Cổ tích",
    "Wing Books",
  ];

  const priceRanges = [
    { label: "Tất cả", min: 0, max: Infinity },
    { label: "Nhỏ hơn 100,000đ", min: 0, max: 100000 },
    { label: "Từ 100,000đ - 200,000đ", min: 100000, max: 200000 },
    { label: "Từ 200,000đ - 300,000đ", min: 200000, max: 300000 },
    { label: "Từ 300,000đ - 400,000đ", min: 300000, max: 400000 },
    { label: "Từ 400,000đ - 500,000đ", min: 400000, max: 500000 },
    { label: "Lớn hơn 500,000đ", min: 500000, max: Infinity },
  ];

  const filteredBooks = books.filter((book) => {
    const inCategory =
      selectedCategory === "Tất cả" || book.genre === selectedCategory;
    const inPriceRange =
      selectedPriceRange === "Tất cả" ||
      (book.price >=
        priceRanges.find((range) => range.label === selectedPriceRange)?.min &&
        book.price <=
          priceRanges.find((range) => range.label === selectedPriceRange)?.max);
    return inCategory && inPriceRange;
  });

  // Logic sắp xếp
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "A-Z") return a.title.localeCompare(b.title);
    if (sortOption === "Z-A") return b.title.localeCompare(a.title);
    if (sortOption === "Giá tăng dần") return a.price - b.price;
    if (sortOption === "Giá giảm dần") return b.price - a.price;

    return 0;
  });

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const displayedBooks = sortedBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleDetail = (id) => {
    navigate(`/book-detail/${id}`);
  };

  return (
    <div style={{ display: "flex" }} className="chinhmenu">
      {/* Menu danh mục */}
      <div style={{ marginRight: "20px", width: "200px" }}>
        <h3 className="text-danger">Danh mục</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {categories.map((category) => (
            <li
              className="text-primary-emphasis"
              key={category}
              style={{
                cursor: "pointer",
                fontWeight: selectedCategory === category ? "bold" : "normal",
                marginBottom: "10px",
              }}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
        <hr></hr>
        {/* Menu khoảng giá */}
        <h3 className="text-danger">Khoảng giá</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {priceRanges.map((range) => (
            <li
              className="text-primary-emphasis"
              key={range.label}
              style={{
                cursor: "pointer",
                fontWeight:
                  selectedPriceRange === range.label ? "bold" : "normal",
                marginBottom: "10px",
              }}
              onClick={() => {
                setSelectedPriceRange(range.label);
                setCurrentPage(1);
              }}
            >
              {range.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Danh sách sách */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>
            {selectedCategory} - {selectedPriceRange}
          </h2>
          {/* Giao diện sắp xếp */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ height: "30px", marginLeft: "20px" }}
          >
            <option value="A-Z">Tên A-Z</option>
            <option value="Z-A">Tên Z-A</option>
            <option value="Giá tăng dần">Giá tăng dần</option>
            <option value="Giá giảm dần">Giá giảm dần</option>
          </select>
        </div>

        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {displayedBooks.map((book) => (
            <li key={book._id} style={{ textAlign: "center" }}>
              <img
                src={`/books/${book.image}?${new Date().getTime()}`}
                alt={book.title}
                className="book-img"
                style={{ width: "191px", height: "301px", cursor: "pointer" }}
                onClick={() => handleDetail(book._id)}
              />
              <p
                className="text center text-secondary-emphasis"
                style={{ cursor: "pointer" }}
                onClick={() => handleDetail(book._id)}
              >
                {book.title}
              </p>
              <p>
                <strong>Price:</strong> {book.price}đ
              </p>
            </li>
          ))}
        </ul>

        {/* Phân trang */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => changePage(index + 1)}
              style={{
                margin: "0 5px",
                padding: "10px 15px",
                border: "1px solid #ddd",
                backgroundColor: currentPage === index + 1 ? "#d32f2f" : "#fff",
                color: currentPage === index + 1 ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookLists;
