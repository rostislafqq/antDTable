import { Button, DatePicker, Form, Input, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const PopUp = ({
  formData,
  setFormData,
  tableData,
  setTableData,
  showModal,
  isModalOpen,
  setIsModalOpen,
  isChange,
  setIsChange,
  handleEdit,
}) => {
  const [id, setId] = useState(
    tableData.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1,
  );

  const handleCancel = () => {
    setFormData({
      name: '',
      age: '',
      date: dayjs().format('DD.MM.YYYY'),
    });
    setIsModalOpen(false);
    setIsChange(false);
  };

  const addUser = () => {
    if (!formData.name || !formData.age || !formData.date) {
      return;
    }
    setFormData({ ...formData, id });
    setTableData([...tableData, formData]);
    setId(1 + id);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getDate = (date, dateString) => {
    setFormData({ ...formData, date: dateString });
  };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day');
  };

  const [popupKey, setPopupKey] = useState(0);
  useEffect(() => {
    if (isModalOpen) {
      setPopupKey((prevKey) => prevKey + 1);
    }
  }, [isModalOpen]);
  return (
    <div key={popupKey}>
      <Button
        type="primary"
        onClick={() => {
          showModal();
        }}>
        Добавить пользователя
      </Button>
      <Modal footer={[]} title="" open={isModalOpen} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off">
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Поле не должно быть пустым' },
              { max: 15, message: 'Поле имя должно содержать до 15 символов' },
              { min: 2, message: 'Поле имя должно содержать более 1 символа' },
              { pattern: /^\D+$/, message: 'Имя не должно содержать числа' },
            ]}>
            <Input
              placeholder="Имя"
              name="name"
              defaultValue={formData.name}
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="age"
            rules={[
              { required: true, message: 'Поле не должно быть пустым' },
              { pattern: /^\d+$/, message: 'Поле должно содержать только цифры' },
            ]}>
            <Input
              placeholder="Возраст"
              name="age"
              defaultValue={formData.age}
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Поле не должно быть пустым' }]}>
            <DatePicker
              format={'DD.MM.YYYY'}
              defaultValue={dayjs(formData.date, 'DD.MM.YYYY')}
              onChange={getDate}
              placeholder="Дата регистрации"
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                if (isChange) {
                  handleEdit(formData.id, formData);
                  handleCancel();
                } else {
                  addUser();
                }
              }}>
              Принять
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
