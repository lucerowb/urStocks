import { Form, Input, Modal, Select, Button, Spin, DatePicker } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import { addStock } from "../../features/stocks/stockSlice";

const FormItem = Form.Item;
const { Option } = Select;

function AddStockModal(props) {
  const { closeAddStockModal, addStockModalVisible } = props;
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const companyState = useSelector((state) => state.company);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const onFinish = (values) => {
    console.log("addStock", values);
    const userData = {
      ...values,
    };
    dispatch(addStock(userData));
    form.resetFields();
    closeAddStockModal();
  };

  const formItemLayout = {
    labelCol: {
      xl: { span: 8 },
      lg: { span: 8 },
      md: { span: 24 },
      sm: { span: 10 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 14 },
      lg: { span: 14 },
      md: { span: 24 },
      sm: { span: 14 },
      xs: { span: 24 },
    },
    labelAlign: "left",
  };
  return (
    <>
      <Modal
        visible={addStockModalVisible}
        title="Add Stock"
        okText="Save"
        cancelText="Cancel"
        destroyOnClose
        onCancel={() => {
          closeAddStockModal();
          form.resetFields();
        }}
        width="600px"
        centered
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          className="login-form"
        >
          <FormItem
            label="Stock Name"
            name="stock_name"
            rules={[
              {
                required: true,
                message: "Please select stock name",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Stock Name"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {companyState?.companies?.map((company, index) => (
                <Option key={index} value={company?.symbol}>
                  {company?.company_name?.toUpperCase()}
                </Option>
              ))}
              {/* <Option value="Standard Chartered Bank">
                Standard Chartered Bank
              </Option>
              <Option value="NIC BANK">NIC Bank</Option>
              <Option value="Hydropower">Hydropower</Option> */}
            </Select>
          </FormItem>
          <FormItem
            label="Transaction Type"
            name="txn_type"
            rules={[
              { required: true, message: "Please select transaction type" },
            ]}
          >
            <Select
              showSearch
              placeholder="Transaction Type"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="buy">Buy</Option>
              <Option value="sell">Sell</Option>
            </Select>
          </FormItem>
          <FormItem
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please enter quantity" },
              { pattern: "^[0-9]+$", message: "Invalid character" },
            ]}
          >
            <Input placeholder="Quantity" autoComplete="off" />
          </FormItem>
          <FormItem
            label="Amount (per Unit)"
            name="amount"
            rules={[
              { required: true, message: "Please enter amount" },
              { pattern: "^[0-9.]+$", message: "Invalid character" },
            ]}
          >
            <Input placeholder="Amount  (per Unit)" autoComplete="off" />
          </FormItem>
          <FormItem
            label="Transaction Date"
            name="txn_date"
            rules={[
              { required: true, message: "Please select transaction date" },
            ]}
          >
            <DatePicker
              placeholder="Transaction Date"
              disabledDate={disabledDate}
              style={{ width: "100%" }}
            />
          </FormItem>
          {/* <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Add
            </Button>
          </FormItem> */}
        </Form>
      </Modal>
    </>
  );
}

export default AddStockModal;
