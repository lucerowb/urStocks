import { useEffect } from "react";
import { Row, Col, Form, Skeleton, Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getCompanyById,
  resetCompanyDetail,
} from "../../features/companies/companyDetailSlice";

const FormItem = Form.Item;
const DetailCompanyModal = (props) => {
  const {
    detailCompanyModalVisible,
    closeDetailCompanyModal,
    // openEditCompanyModal,
  } = props;

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { company, ...companyDetailState } = useSelector(
    (state) => state.companyDetail
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(getCompanyById(props.id));
    return () => {
      dispatch(resetCompanyDetail());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const formItemLayout = {
    labelCol: {
      xl: { span: 7 },
      lg: { span: 7 },
      md: { span: 10 },
      sm: { span: 8 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 12 },
      lg: { span: 17 },
      md: { span: 12 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    labelAlign: "left",
  };

  return (
    <>
      <Modal
        visible={detailCompanyModalVisible}
        title="Company"
        destroyOnClose={true}
        onCancel={closeDetailCompanyModal}
        width="600px"
        centered
        footer={[
          <Button key="cancel" onClick={closeDetailCompanyModal}>
            Cancel
          </Button>,
          // <Button
          //   key="edit"
          //   type="primary"
          //   loading={companyLoading}
          //   onClick={openEditCompanyModal}
          // >
          //   Edit
          // </Button>
        ]}
      >
        <Skeleton loading={companyDetailState?.isLoading} active>
          <Form {...formItemLayout} form={form} className="login-form">
            <FormItem label="Company Name" name="company_name">
              {company && company?.company_name}
            </FormItem>
            <FormItem label="Symbol" name="symbol">
              {company && company?.symbol}
            </FormItem>
            <FormItem
              label="Available Quantity"
              name="available_quantity"
              rules={[
                { required: true, message: "Please enter available quantity" },
                { pattern: "^[0-9]+$", message: "Invalid character" },
              ]}
            >
              {company && company?.available_quantity}
            </FormItem>
            <FormItem
              label="Previous Amount (per Unit)"
              name="prev_amount"
              rules={[
                { required: true, message: "Please enter previous amount" },
                { pattern: "^[0-9.]+$", message: "Invalid character" },
              ]}
            >
              {company && company?.prev_amount}
            </FormItem>
            <FormItem
              label="Current Amount (per Unit)"
              name="current_amount"
              rules={[
                { required: true, message: "Please enter current amount" },
                { pattern: "^[0-9.]+$", message: "Invalid character" },
              ]}
            >
              {company && company?.current_amount}
            </FormItem>
          </Form>
        </Skeleton>
      </Modal>
    </>
  );
};

export default DetailCompanyModal;
