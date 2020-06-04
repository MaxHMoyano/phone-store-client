import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTransactions,
  selectTransactionsPendingStatus,
  updateTransaction,
} from '../../redux/slices/TransactionsSlice';
import { fromUnixTime, format } from 'date-fns';
import { Transaction } from '../../models/Shared';

const Transactions = (props) => {
  const dispatch = useDispatch();

  // Selectors
  const transactions = useSelector(selectTransactions);
  const pending = useSelector(selectTransactionsPendingStatus);

  // functions

  const changeTransactionStatus = (transaction: Transaction, value) => {
    let updatedTransaction = {
      ...transaction,
      active: value,
    };
    dispatch(updateTransaction(updatedTransaction));
  };

  return (
    <Fragment>
      <Modal {...props} size={'xl'} centered>
        <Modal.Header closeButton>
          <Modal.Title>Compras pendientes</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {!pending ? (
            <Table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th>Entregado</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, idx) => (
                  <tr key={idx}>
                    <td>
                      {format(
                        fromUnixTime(transaction.created_at._seconds),
                        'dd/MM/yyyy'
                      )}
                    </td>
                    <td>
                      {transaction.items.map((item, index) => (
                        <div key={index}>
                          <span
                            style={{ width: '5%', display: 'inline-block' }}
                          >
                            {item.quantity}
                          </span>
                          <span
                            style={{ width: '5%', display: 'inline-block' }}
                          >
                            -
                          </span>
                          <span
                            style={{ width: 'auto', display: 'inline-block' }}
                          >
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td>
                      <Form.Check
                        custom
                        label={''}
                        type={'checkbox'}
                        id={`${idx}_transaction_check`}
                        checked={!transaction.active}
                        onChange={(e) =>
                          changeTransactionStatus(
                            transaction,
                            !transaction.active
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className='d-flex justify-content-center'>
              <i className='fas fa-spinner fa-spin fa-2x'></i>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'light'} onClick={props.onHide}>
            Cancelar
          </Button>
          <Button variant={'primary'} onClick={props.onHide}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

Transactions.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default Transactions;
