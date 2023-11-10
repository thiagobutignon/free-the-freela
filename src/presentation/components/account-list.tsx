import { Box, List, ListItem, Text } from '@chakra-ui/react';

import { BankAccount } from '../../domain/models';
import React from 'react';

type AccountListProps = {
  accounts: BankAccount[]
};

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  return (
    <>
      <List spacing={3} padding={4}>
        {accounts.map(account => (
          <ListItem key={account.accountId} p={4} border='1px' borderColor='gray.200'>
            <Box>
              <Text fontWeight='bold'>Account Type: {account.accountType}</Text>
              <Text>Current Balance: ${account.balance.current.toFixed(2)}</Text>
              <Text>Number of Transactions: {account.transactions?.length}</Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AccountList
