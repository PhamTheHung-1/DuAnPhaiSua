import { Link } from "react-router-dom";
import { newBooks, bestSellers, Combo, Manga } from "../JS/testbook";
function BookList({ title, books , addCart}) {
  console.log(typeof(addCart));
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

function Body({addCart}) {
  console.log(typeof(addCart));
  return (
    <div>
      <div id="slider">
        <figure>
          <img src="./public/img/slider1.webp" alt="" />
          <img src="./public/img/slider2.webp" alt="" />
          <img src="./public/img/slider3.webp" alt="" />
          <img src="./public/img/slider4.webp" alt="" />
        </figure>
      </div>
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
      <BookList title="Sách mới" books={newBooks} addCart={addCart}/>
      <BookList title="Sách bán chạy" books={bestSellers} addCart={addCart}/>
      {/* quang cao */}
      <div className="banner mt-5">
        <img src="./public/img/banner.webp" className="mx-auto"></img>
      </div>
      <BookList title="Combo" books={Combo}  addCart={addCart}/>
      <div className="banner mt-5">
        <img src="./public/img/bannermanga.webp" className="mx-auto"></img>
      </div>
      <BookList title="Manga" books={Manga}  addCart={addCart}/>

      <div className="ship">
        <div className="container text-center my-5">
          <h2>Dịch vụ cửa hàng trực tuyến</h2>
          <p>Toàn bộ ưu đãi của chúng tôi chỉ cách bạn 1 cú click chuột</p>
          <div className="row mt-4">
            {/* Service 1 */}
            <div className="col-md-3">
              <i className="fa-solid fa-truck on"></i>
              <h5 className="mt-3">Free ship từ đơn 100,000đ</h5>
            </div>
            {/* Service 2 */}
            <div className="col-md-3">
              <i className="fa-solid fa-headphones on"></i>
              <h5 className="mt-3">Trung tâm trợ giúp</h5>
            </div>
            {/* Service 3 */}
            <div className="col-md-3">
              <i className="fa-solid fa-book on"></i>
              <h5 className="mt-3">60 ngày thử hàng</h5>
            </div>
            {/* Service 4 */}
            <div className="col-md-3">
              <i className="fa-solid fa-cart-shopping on"></i>
              <h5 className="mt-3">Thanh toán an toàn 100%</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { BookList };
export default Body;
