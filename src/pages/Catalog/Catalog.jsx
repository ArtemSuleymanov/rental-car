import { useState, useEffect } from 'react';
import axios from 'axios';
import s from './Catalog.module.css';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Завантаження брендів
    const fetchBrands = async () => {
      const { data } = await axios.get('https://your-api.com/brands');
      setBrands(data);
    };
    fetchBrands();
  }, []);

  const fetchCars = async (pageNum = 1, reset = false) => {
    try {
      const params = {
        ...filters,
        page: pageNum,
        limit: 8,
      };

      const { data } = await axios.get(`https://your-api.com/cars`, { params });

      setCars(prev => reset ? data.cars : [...prev, ...data.cars]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars(page, true);
    // eslint-disable-next-line
  }, [filters]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    setPage(1); // Скидаємо сторінку при фільтрації
  };

  const handleSearch = e => {
    e.preventDefault();
    fetchCars(1, true); // Скидаємо список
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCars(nextPage);
  };

  return (
    <div className={s.catalog}>
      <form className={s.filters} onSubmit={handleSearch}>
        <select name="brand" value={filters.brand} onChange={handleInputChange}>
          <option value="">Choose a brand</option>
          {brands.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select name="rentalPrice" value={filters.rentalPrice} onChange={handleInputChange}>
          <option value="">Choose a price</option>
          <option value="30">до $30</option>
          <option value="40">до $40</option>
          <option value="50">до $50</option>
        </select>

        <input
          type="number"
          name="minMileage"
          placeholder="From"
          value={filters.minMileage}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="maxMileage"
          placeholder="To"
          value={filters.maxMileage}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <div className={s.grid}>
        {cars.map(car => (
          <div key={car.id} className={s.card}>
            <img src={car.img} alt={car.model} />
            <h3>{car.brand} {car.model}, {car.year}</h3>
            <p>${car.rentalPrice}</p>
            <button className={s.btn}>Read more</button>
          </div>
        ))}
      </div>

      <button onClick={handleLoadMore} className={s.loadMore}>Load more</button>
    </div>
  );
};

export default Catalog;
