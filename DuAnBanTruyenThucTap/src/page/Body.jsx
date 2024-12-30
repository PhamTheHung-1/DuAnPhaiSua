import { Link } from "react-router-dom";
import { newBooks, bestSellers, Combo, Manga } from "../JS/testbook";
function BookList({ title, books, addCart }) {
  console.log(typeof addCart);
  const limitedBooks = [];
  for (let i = 0; i < books.length && i < 5; i++) {
    limitedBooks.push(
      <a href="#" className="sale" key={i}>
        <img src={books[i].img} alt={books[i].title} />
        <p>{books[i].title}</p>
        <span className="prince">{books[i].price}</span>{" "}
        <s>{books[i].originalPrice}</s>
      </a>
    );
  }

  // Trả về JSX
  return (
    <div className="custom">
      <p className="h1 text-center mt-3 mb-3">{title}</p>
      <div className="bok">
        {books.map((book, index) => (
          <div>
            <Link to={`/product/${book.title}`} className="sale" key={index}>
              <img src={`./public/img/${book.img}`} alt={book.title} />
              <p>{book.title}</p>
              <span className="prince">{book.price}</span>{" "}
              <s>{book.originalPrice}</s>
            </Link>
            <button
              key={index}
              onClick={() => addCart(book)}
              className="giohangcuadung"
            >
              🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Body({ addCart }) {
  console.log(typeof addCart);
  return (
    <div>
      {/* silder */}
      <div id="slider">
        <figure>
          <img src="./public/img/slider1.webp" alt="" />
          <img src="./public/img/slider2.webp" alt="" />
          <img src="./public/img/slider3.webp" alt="" />
          <img src="./public/img/slider4.webp" alt="" />
        </figure>
      </div>
      {/* trang tri */}
      <div className="gioithieu" id="gt">
        <h2 className="text-center">Giới thiệu về chúng tôi</h2>
        <p className="text-center">
          Chào mừng bạn đến với trang bán truyện của chúng tôi!
        </p>
        <div className="trangtri d-flex">
          <div className="traitrangti d-flex  me-5 text-break">
            <p className="text-break ">
              Chúng tôi cam kết mang đến cho bạn những trải nghiệm tuyệt vời qua
              từng trang truyện. Với sứ mệnh chia sẻ niềm đam mê đọc truyện,
              chúng tôi cung cấp các tựa sách đa dạng từ truyện tranh, tiểu
              thuyết, truyện ngắn cho đến những tác phẩm kinh điển, phù hợp với
              mọi lứa tuổi và sở thích. Tại đây, bạn sẽ tìm thấy: Những bộ
              truyện mới nhất và hấp dẫn nhất. Các chương trình ưu đãi đặc biệt
              dành cho khách hàng thân thiết. Một cộng đồng yêu thích truyện nơi
              bạn có thể chia sẻ và kết nối. Chúng tôi luôn nỗ lực không ngừng
              để đem lại sự hài lòng cho bạn, từ chất lượng sản phẩm đến dịch vụ
              hỗ trợ.
            </p>
          </div>
          <div className="phaitrangtri d-flex ms-5">
            <img src="./public/img/about.png"></img>
          </div>
        </div>
      </div>
      <div className="banner mt-5">
        <img src="./public/img/banner.webp" className="mx-auto"></img>
      </div>
      {/* hien san pham */}
      <h2 className="text-center text-danger">Một số sản phẩm</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              textAlign: "center",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <img
              src={`/books/${book.image}?${new Date().getTime()}`}
              alt={book.title}
              className="book-img"
              style={{
                width: "191px",
                height: "301px",
                cursor: "pointer",
              }}
              onClick={() => handleDetail(book._id)}
            />
            <p
              className="text-center text-secondary-emphasis"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                margin: "10px 0",
              }}
              onClick={() => handleDetail(book._id)}
            >
              {book.title}
            </p>
            <p>
              <strong>Price:</strong> {book.price}đ
            </p>
          </div>
        ))}
      </div>
      <div className="banner mt-5">
        <img src="./public/img/bannermanga.webp" className="mx-auto"></img>
      </div>
      <div className="banner mt-5">
        <img src="./public/img/banner3.webp" className="mx-auto"></img>
      </div>
      <br></br>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.905477254171!2d105.95869797602138!3d21.11633428476346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313507dcfbdec085%3A0xd699ee01294414dd!2zQ2jhu6MgR2nDoHU!5e0!3m2!1svi!2s!4v1735480719721!5m2!1svi!2s"
          width="1900"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Body;
