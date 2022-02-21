import { Form, Input, Modal, Select, Button, Spin, DatePicker } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import { addCompany } from "../features/companies/companySlice";

const FormItem = Form.Item;
const { Option } = Select;

function AddCompanyModal(props) {
  const { closeAddCompanyModal, addCompanyModalVisible } = props;
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onFinish = (values) => {
    console.log("addCompany", values);
    const userData = {
      ...values,
    };
    dispatch(addCompany(userData));
    form.resetFields();
    closeAddCompanyModal();
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
        visible={addCompanyModalVisible}
        title="Add Company"
        okText="Save"
        cancelText="Cancel"
        destroyOnClose
        onCancel={() => {
          closeAddCompanyModal();
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
            label="Company Name"
            name="company_name"
            rules={[
              {
                required: true,
                message: "Please select company name",
              },
            ]}
          >
            <Input placeholder="Company Name" autoComplete="off" />
          </FormItem>
          <FormItem
            label="Symbol"
            name="symbol"
            rules={[
              { required: true, message: "Please select transaction type" },
            ]}
          >
            <Input placeholder="Symbol" autoComplete="off" />
          </FormItem>
          <FormItem
            label="Available Quantity"
            name="available_quantity"
            rules={[
              { required: true, message: "Please enter available quantity" },
              { pattern: "^[0-9]+$", message: "Invalid character" },
            ]}
          >
            <Input placeholder="Available Quantity" autoComplete="off" />
          </FormItem>
          <FormItem
            label="Previous Amount (per Unit)"
            name="prev_amount"
            rules={[
              { required: true, message: "Please enter previous amount" },
              { pattern: "^[0-9.]+$", message: "Invalid character" },
            ]}
          >
            <Input
              placeholder="Previous Amount  (per Unit)"
              autoComplete="off"
            />
          </FormItem>
          <FormItem
            label="Current Amount (per Unit)"
            name="current_amount"
            rules={[
              { required: true, message: "Please enter current amount" },
              { pattern: "^[0-9.]+$", message: "Invalid character" },
            ]}
          >
            <Input
              placeholder="Current Amount  (per Unit)"
              autoComplete="off"
            />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}

export default AddCompanyModal;
