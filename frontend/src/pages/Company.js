import { Button, Col, Row, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

import { getCompanies, reset } from "../features/companies/companySlice";
import { useEffect, useState } from "react";
import AddCompanyModal from "./AddCompanyModal";
import { PlusCircleOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter } from "../utility/commonUtills";

function Company(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { companies, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.company
  );

  const [addCompanyModalVisible, setAddCompanyModalVisible] = useState(false);

  const closeAddCompanyModal = () => {
    setAddCompanyModalVisible(false);
  };

  const openAddCompanyModal = () => {
    setAddCompanyModalVisible(true);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getCompanies());

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
      title: "Company Name",
      dataIndex: "company_name",
      sorter: (a, b) =>
        (a["company_name"]?.toString() || "").localeCompare(
          b["company_name"]?.toString() || ""
        ),
      key: "company_name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      sorter: (a, b) =>
        (a["symbol"]?.toString() || "").localeCompare(
          b["symbol"]?.toString() || ""
        ),
      key: "symbol",
      //   render: (text, record) => {
      //     return <span>{capitalizeFirstLetter(record?.txn_type)}</span>;
      //   },
    },
    {
      title: "Available Quantity ",
      dataIndex: "available_quantity",
      sorter: (a, b) =>
        (a["available_quantity"]?.toString() || "").localeCompare(
          b["available_quantity"]?.toString() || ""
        ),
      key: "available_quantity",
    },
    {
      title: "Previous Amount",
      dataIndex: "prev_amount",
      sorter: (a, b) =>
        (a["prev_amount"]?.toString() || "").localeCompare(
          b["prev_amount"]?.toString() || ""
        ),
      key: "prev_amount",
    },
    {
      title: "Current Amount",
      dataIndex: "current_amount",
      sorter: (a, b) =>
        (a["current_amount"]?.toString() || "").localeCompare(
          b["current_amount"]?.toString() || ""
        ),
      key: "current_amount",
    },
    {
      title: "Created on",
      dataIndex: "created_at",
      sorter: (a, b) =>
        (a["created_at"]?.toString() || "").localeCompare(
          b["created_at"]?.toString() || ""
        ),
      key: "created_at",
      render: (text, record) => {
        return <span>{moment(record?.created_at).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "Modified on",
      dataIndex: "updated_at",
      sorter: (a, b) =>
        (a["updated_at"]?.toString() || "").localeCompare(
          b["updated_at"]?.toString() || ""
        ),
      key: "updated_at",
      render: (text, record) => {
        return <span>{moment(record?.updated_at).format("YYYY-MM-DD")}</span>;
      },
    },
  ];

  return (
    <div className="d-flex justify-content-start align-items-start">
      <Row>
        <Col xs={20}>
          <h1>Companies</h1>
        </Col>
        <Col xs={4}>
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            className="ant-btn no-underline ml-2"
            onClick={() => {
              openAddCompanyModal();
            }}
          >
            Add Company
          </Button>
        </Col>
        <Col xs={24}>
          <Table
            rowKey={(record) => record?._id}
            columns={columns.filter((d) => d.isVisible !== false)}
            dataSource={companies}
            scroll={{ x: "max-content" }}
            loading={isLoading}
            // rowClassName={(record, index) => {
            //   return record?.txn_type?.toLowerCase() === "buy"
            //     ? "buy-background"
            //     : "sell-background";
            // }}
          />
        </Col>
      </Row>
      {addCompanyModalVisible && (
        <AddCompanyModal
          {...props}
          addCompanyModalVisible={addCompanyModalVisible}
          setAddCompanyModalVisible={setAddCompanyModalVisible}
          closeAddCompanyModal={closeAddCompanyModal}
        />
      )}
    </div>
  );
}

export default Company;
