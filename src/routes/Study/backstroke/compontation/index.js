import React, { Component } from 'react'
import style from './index.scss'
import {Form,Button,Input,message,Table,Divider,InputNumber, Popconfirm,} from 'antd'
import InputPotting from '../../../../components/selfpotting/inputpotting'
import axios from 'axios'
const {TextArea}  = Input

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
    UNSAFE_componentWillReceiveProps(nextProps){
     console.log(nextProps.dataSource);
     this.setState({
        data : nextProps.dataSource 
     })
    }
  constructor(props) {
    super(props);
    this.state = { editingKey: '',data:[] };
    this.columns = [
      {
        title: 'title',
        dataIndex: 'title',
        width: '20%',
      },
      {
        title: 'content',
        dataIndex: 'content',
        width: '60%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.delete(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Delete
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </a>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;
  delete(form, key){
   let obj = {
       title : '仰泳',
       index : key-1
   }
   axios.post('http://localhost:4000/swimmimg/skill/deleteCompetition',obj)
   .then((res)=>{message.info('删除成功');
   window.location.reload()
   })
   .catch((err)=>{message.info("删除失败");
   })
  }
  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          content : item.content,
          newContent : row.content,
          title : '仰泳'
        });
        // 发起网络请求 
        axios.post('http://localhost:4000/swimmimg/skill/findcompetition',newData[index])
        .then((res)=>{message.info('修改成功');
        window.location.reload()
        this.setState({ data: newData, editingKey: '' });
        })
        .catch((err)=>{message.info("修改失败");
        })
    }
     else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
     }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
 
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          tableLayout ="fixed"
          pagination={{defaultPageSize:5}}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);





 class index extends Component {
     constructor(){
         super()
         this.state = {
             renderTable : [],
             cutStr : []
         }
     }
    handleSubmit(e){
        e.preventDefault();
        let obj = {
            title : '仰泳',
            content : null
        }
        this.props.form.validateFields((err,values)=>{ 
            if(!err){
                const {text } = values
                obj.content  = text
                axios.post('http://localhost:4000/swimmimg/skill/competition',obj)
                .then((res)=>{message.info('添加成功');
                window.location.reload()
                })
                .catch((err)=>{message.info("添加失败");
                })
            }
        })
    }

   componentDidMount(){
       axios.get('http://localhost:4000/swimmimg/skill/all').then((result)=>{
          result.data.forEach((item,i)=>{
             if(item.title == '仰泳'){
                 this.setState({
                    renderTable : item.competition
                 })
             }
          })
          
       })
   }
  

    render() {
        const {getFieldDecorator}  = this.props.form
        const {renderTable} = this.state
        const columns = [
            {
              key : 'title',
              title : '标题',
              dataIndex : 'title',
              width: '20%',
              render : (text,record)=>{
                return {
                    children: <strong>{text}</strong>,
                    props: {
       
                    
                    }
                  };
              }
            },
            {
              key : 'content',
              title : '内容',
              dataIndex : 'content',
              width: '60%'
            },
            {
                title: 'Action',
                key: 'action',
                width: '20%',
                render: (text, record) => {
                    let res = record
                    console.log(res);
                    return (
                        <span>
                        <a onClick={(e,res)=>this.views(e,res)}>查看</a>
                        <Divider type="vertical" />
                      <a>修改</a>
                      <Divider type="vertical" />
                      <a>删除</a>
                    </span>
                    )
                },
              },
        ]
        const dataSource = [
        ]
        renderTable.forEach((item,i)=>{
            dataSource.push({
               key : i+1,
               title : "仰泳与竞赛",
               content : item
           })
        })
        return (
            <div className="history-wrap">
                <Form>
                 <Form.Item>
                     <InputPotting title="仰泳与竞赛" />
                 </Form.Item>
                 <Form.Item>
                 {
                     getFieldDecorator('text',{
                          rules : [
                              {
                                required: true,
                                message: '内容不能为空'
                              }
                          ]   
                    })(<TextArea placeholder="请输入内容" rows={6} allowClear/>)}
                 </Form.Item>
                 <Form.Item>
            <Button onClick={(e)=>this.handleSubmit(e)} className="btn" type="primary">
              提 交
            </Button>
          </Form.Item>
                </Form>
                <hr/>
    {/* <Table columns={columns} dataSource={dataSource} tableLayout="fixed" pagination={{defaultPageSize:5}}></Table> */}
    <EditableFormTable dataSource={dataSource}></EditableFormTable>
            </div>
        )
    }
}

export default Form.create()(index)