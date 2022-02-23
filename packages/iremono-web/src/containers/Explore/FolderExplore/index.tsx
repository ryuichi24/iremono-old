import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

export const FolderExplore = () => {
  const params = useParams<{ id: string }>();
  const folderId = params.id || 'root';

  return (
    <Container>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem nodeId="1" label="Applications" sx={{ color: 'text.primary' }}>
          <TreeItem nodeId="2" label="Calendar" sx={{ color: 'text.primary' }} />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents" sx={{ color: 'text.primary' }}>
          <TreeItem nodeId="10" label="OSS" sx={{ color: 'text.primary' }} />
          <TreeItem nodeId="6" label="MUI" sx={{ color: 'text.primary' }}>
            <TreeItem nodeId="8" label="index.js" sx={{ color: 'text.primary' }} />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Container>
  );
};

const Container = styled(Box)`
  padding: 0.5rem;
`;
