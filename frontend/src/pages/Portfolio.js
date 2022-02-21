import { Button, Col, Row, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

import { getStocks, reset } from "../features/stocks/stockSlice";
import { useEffect, useState } from "react";
import AddStockModal from "./AddStockModal";
import { PlusCircleOutlined } from "@ant-design/icons";

function Portfolio(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stocks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.stock
  );

  const [addStockModalVisible, setAddStockModalVisible] = useState(false);

  const closeAddStockModal = () => {
    setAddStockModalVisible(false);
  };

  const openAddStockModal = () => {
    setAddStockModalVisible(true);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getStocks());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Stock Name",
      dataIndex: "stock_name",
      sorter: (a, b) =>
        (a["stock_name"]?.toString() || "").localeCompare(
          b["stock_name"]?.toString() || ""
        ),
      key: "stock_name",
    },
    {
      title: "Transaction Type",
      dataIndex: "txn_type",
      sorter: (a, b) =>
        (a["txn_type"]?.toString() || "").localeCompare(
          b["txn_type"]?.toString() || ""
        ),
      key: "txn_type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) =>
        (a["quantity"]?.toString() || "").localeCompare(
          b["quantity"]?.toString() || ""
        ),
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) =>
        (a["amount"]?.toString() || "").localeCompare(
          b["amount"]?.toString() || ""
        ),
      key: "amount",
    },
    {
      title: "Transaction Date",
      dataIndex: "txn_date",
      sorter: (a, b) =>
        (a["txn_date"]?.toString() || "").localeCompare(
          b["txn_date"]?.toString() || ""
        ),
      key: "txn_date",
      render: (text, record) => {
        return <span>{moment(record?.txn_date).format("YYYY-MM-DD")}</span>;
      },
    },
  ];

  return (
    <div className="d-flex justify-content-start align-items-start">
      <Row>
        <Col xs={20}>
          <h1>My portfolio</h1>
        </Col>
        <Col xs={4}>
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            className="ant-btn no-underline ml-2"
            onClick={() => {
              openAddStockModal();
            }}
          >
            Add Stock
          </Button>
        </Col>
        <Col xs={24}>
          <Table
            rowKey={(record) => record?._id}
            columns={columns.filter((d) => d.isVisible !== false)}
            dataSource={stocks}
            scroll={{ x: "max-content" }}
            loading={isLoading}
            rowClassName={(record, index) => {
              return record?.txn_type?.toLowerCase() === "buy"
                ? "green-background"
                : "red-background";
            }}
          />
        </Col>
      </Row>
      {addStockModalVisible && (
        <AddStockModal
          {...props}
          addStockModalVisible={addStockModalVisible}
          setAddStockModalVisible={setAddStockModalVisible}
          closeAddStockModal={closeAddStockModal}
        />
      )}
    </div>
  );
}

export default Portfolio;
