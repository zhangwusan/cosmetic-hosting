

interface ProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  rate: number;
  description: string;
}

export const bestSellingProduct: ProductType[] = [
    {
        "id": 1,
        "name": "Lipstick",
        "image": "../public/images/lipstick.jpg",
        "price": 10.99,
        "rate": 4.5,
        "description": "Long-lasting matte lipstick in various shades."
      },
      {
        "id": 2,
        "name": "Eyeshadow Palette",
        "image": "eyeshadow_palette.jpg",
        "price": 19.99,
        "rate": 4.8,
        "description": "Highly pigmented eyeshadow palette with multiple shades for various looks."
      },
      {
        "id": 3,
        "name": "Foundation",
        "image": "foundation.jpg",
        "price": 15.50,
        "rate": 4.7,
        "description": "Liquid foundation for a flawless complexion with buildable coverage."
      },
      {
        "id": 4,
        "name": "Mascara",
        "image": "mascara.jpg",
        "price": 8.75,
        "rate": 4.6,
        "description": "Lengthening and volumizing mascara for fuller lashes."
      },
]