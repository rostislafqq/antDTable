import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { TableComponent } from '../components/organisms';
import { initialData } from '../data/initialData';
import { PopUp } from '../components/molecules';
import dayjs from 'dayjs';
import Search from 'antd/es/input/Search';

export const Table = () => {
  const [tableData, setTableData] = useState(initialData);

  const handleDelete = (id) => {
    const newData = tableData.filter((item) => item.id !== id);
    setTableData(newData);
  };
  const handleEdit = (id, newObject) => {
    setTableData(tableData.map((item) => (item.id === id ? { ...newObject, id: item.id } : item)));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const [isChange, setIsChange] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    date: dayjs().format('DD.MM.YYYY'),
  });

  const [filteredData, setFilteredData] = useState(tableData);
  const handleSearch = (value) => {
    const filtered = tableData.filter((record) => {
      const searchData = Object.values(record).join('').toLowerCase();
      return searchData.includes(value.toLowerCase());
    });

    setFilteredData(filtered);
  };
  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);
  return (
    <Row>
      <Col xs={24} md={{ span: 12, offset: 6 }}>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <PopUp
            formData={formData}
            setFormData={setFormData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            showModal={showModal}
            tableData={filteredData}
            setTableData={setTableData}
            isChange={isChange}
            setIsChange={setIsChange}
            handleEdit={handleEdit}
          />
        </div>
        <Search
          loading
          placeholder="Поиск..."
          style={{ marginBottom: 16 }} // Добавляем отступ снизу
          onChange={(e) => handleSearch(e.target.value)}
        />
        <TableComponent
          setFormData={setFormData}
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
          tableData={filteredData}
          setIsChange={setIsChange}
        />
      </Col>
    </Row>
  );
};
