import { useEffect, useState, useRef } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { http } from '@/utils'


const { Option } = Select
const Publish = () => {
  //列表讀取
  const { channelStore } = useStore()
  //存圖片
  const [fileList, setFileList] = useState([])
  const onUploadChange = ({ fileList }) => {
    //數據統一
    const formatList = fileList.map(item => {
      if (item.response) {
        return {
          url: item.response.data.url
        }
      }
      return item
    })
    console.log(formatList)
    setFileList(formatList)
  }
  //切圖片
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    console.log(e.target.value)
    setImgCount(e.target.value)
    setFileList([])
  }
  //提交
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values)
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    console.log(params)
    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params)
    }
    else {
      await http.post('/mp/articles?draft=false', params)
    }
    navigate('/article')
    message.success(`${id ? '編輯成功' : '發布成功'}`)
  }

  //文章編輯
  const [params] = useSearchParams()
  const id = params.get('id')
  //回傳參數
  const form = useRef(null)
  useEffect(() => {
    const loadDetall = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      const data = res.data
      form.current.setFieldsValue({ ...data, type: data.cover.type })
      setFileList(data.cover.images.map(item => {
        return {
          url: item
        }
      }))
    }
    if (id) {
      loadDetall()
      console.log(form.current)
    }
  }, [id])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '編輯文章' : '發布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: 'this is content' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="標題"
            name="title"
            rules={[{ required: true, message: '請輸入標題' }]}
          >
            <Input placeholder="請輸入標題" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="頻道"
            name="channel_id"
            rules={[{ required: true, message: '請選頻道' }]}
          >
            <Select placeholder="請選頻道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面圖">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>單圖</Radio>
                <Radio value={3}>三圖</Radio>
                <Radio value={0}>無</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount !== 0 ? (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            ) : null}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '請輸入內容' }]}
          >
            <ReactQuill theme='snow' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? '編輯文章' : '發布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)