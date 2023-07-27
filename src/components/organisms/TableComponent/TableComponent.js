import React from 'react';
import { Popconfirm, Space, Table, Typography } from 'antd';
import { sortDate } from '../../../utils';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Link } = Typography;

export const TableComponent = ({
  setIsChange,
  setFormData,
  setIsModalOpen,
  tableData,
  handleDelete,
}) => {
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => sortDate(a.date, b.date),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="Вы уверены?" onConfirm={() => handleDelete(record.id)}>
            <Link>
              <DeleteOutlined />
            </Link>
          </Popconfirm>
          <Link>
            <EditOutlined
              onClick={() => {
                setIsChange(true);
                setFormData({
                  name: record.name,
                  age: record.age,
                  date: record.date,
                  id: record.id,
                });

                setIsModalOpen(true);
              }}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return <Table bordered dataSource={tableData} columns={columns} pagination={false} />;
};
