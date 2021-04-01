const products = [
  {
    id: 1,
    title: "first product",
    category: "face",
    price: 15.99,
    img: "./img/img_1.jpg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "second product",
    category: "hands",
    price: 13.99,
    img: "./img/img_2.jpg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "third product",
    category: "body",
    price: 6.99,
    img: "./img/img_3.jpg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "fourth product",
    category: "face",
    price: 20.99,
    img: "./img/img_4.jpg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "fifth product",
    category: "hands",
    price: 22.99,
    img: "./img/img_5.jpg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "sixth product",
    category: "body",
    price: 18.99,
    img: "./img/img_6.jpg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "product nr 7",
    category: "face",
    price: 8.99,
    img: "./img/img_7.jpg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "eighth product",
    category: "hands",
    price: 12.99,
    img: "./img/img_8.jpg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "product nr nine",
    category: "body",
    price: 16.99,
    img: "./img/img_9.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "product nr 10",
    category: "legs",
    price: 16.99,
    img: "./img/img_10.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const container = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// render products list and buttons once open browser
window.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  displayBtns();
});

function renderProducts(data) {
  const displayProducts = data
    .map(({ title, price, img, desc }) => {
      return `<article class="product-item">
                <img class="photo" src=${img} alt="product">
                <div class="item-info">
                    <header>
                        <h3>${title}</h3>
                        <span class="price">$${price}</span>
                    </header>
                    <p class="item-text">
                        ${desc}
                    </p>
                </div>
            </article>`;
    })
    .join("");
  container.innerHTML = displayProducts;
}

function displayBtns() {
  //    choose unique categories
  const categories = products.reduce(
    (acc, { category }) => {
      return acc.includes(category) ? acc : [...acc, category];
    },
    ["all"]
  );
  //   create btns
  const displayBtns = categories
    .map((category) => {
      return `<button class="filter-btn" type="button" data-category=${category}>${category}</button>`;
    })
    .join("");
  // insert btns into html
  btnContainer.innerHTML = displayBtns;

  const filterBtns = document.querySelectorAll(".filter-btn");
  // filter products according to category
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btnCategory = e.currentTarget.dataset.category;
      const filteredProducts = products.filter(
        ({ category }) => category === btnCategory
      );
      filteredProducts.length > 0
        ? renderProducts(filteredProducts)
        : renderProducts(products);
    });
  });
}
