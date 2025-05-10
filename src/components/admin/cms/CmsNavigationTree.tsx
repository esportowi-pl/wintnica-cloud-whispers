
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, FolderOpen, File, FileText, Settings } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: TreeNode[];
  expanded?: boolean;
}

interface CmsNavigationTreeProps {
  activeNodeId?: string;
}

const CmsNavigationTree: React.FC<CmsNavigationTreeProps> = ({ activeNodeId }) => {
  const navigate = useNavigate();
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'content': true,
    'users': true,
    'settings': true
  });

  const cmsTree: TreeNode[] = [
    {
      id: 'content',
      label: 'Zarządzanie treścią',
      icon: <FileText size={18} />,
      path: '/cms/content',
      children: [
        { id: 'content-articles', label: 'Artykuły', icon: <File size={16} />, path: '/cms/content/articles' },
        { id: 'content-pages', label: 'Strony', icon: <File size={16} />, path: '/cms/content/pages' },
        { id: 'content-media', label: 'Media', icon: <File size={16} />, path: '/cms/content/media' },
      ]
    },
    {
      id: 'groups',
      label: 'Grupy lokalne',
      icon: <FolderOpen size={18} />,
      path: '/cms/groups',
      children: [
        { id: 'groups-list', label: 'Lista grup', icon: <File size={16} />, path: '/cms/groups/list' },
        { id: 'groups-requests', label: 'Prośby o dołączenie', icon: <File size={16} />, path: '/cms/groups/requests' },
      ]
    },
    {
      id: 'market',
      label: 'Rynek lokalny',
      icon: <FolderOpen size={18} />,
      path: '/cms/market',
      children: [
        { id: 'market-listings', label: 'Ogłoszenia', icon: <File size={16} />, path: '/cms/market/listings' },
        { id: 'market-categories', label: 'Kategorie', icon: <File size={16} />, path: '/cms/market/categories' },
      ]
    },
    {
      id: 'gazette',
      label: 'Gazeta',
      icon: <FolderOpen size={18} />,
      path: '/cms/gazette',
      children: [
        { id: 'gazette-issues', label: 'Wydania', icon: <File size={16} />, path: '/cms/gazette/issues' },
        { id: 'gazette-subscriptions', label: 'Subskrypcje', icon: <File size={16} />, path: '/cms/gazette/subscriptions' },
      ]
    },
    {
      id: 'handmade',
      label: 'Rękodzieło',
      icon: <FolderOpen size={18} />,
      path: '/cms/handmade',
      children: [
        { id: 'handmade-products', label: 'Produkty', icon: <File size={16} />, path: '/cms/handmade/products' },
        { id: 'handmade-creators', label: 'Twórcy', icon: <File size={16} />, path: '/cms/handmade/creators' },
      ]
    },
    {
      id: 'settings',
      label: 'Ustawienia',
      icon: <Settings size={18} />,
      path: '/cms/settings'
    }
  ];

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes[node.id] || false;
    const isActive = activeNodeId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center py-1 px-2 rounded-md transition-colors cursor-pointer ${
            isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
          }`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            }
            if (node.path) {
              navigate(node.path);
            }
          }}
        >
          {hasChildren ? (
            <span className="mr-1">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          ) : (
            <span className="w-4 mr-1"></span>
          )}
          <span className="mr-2">{node.icon}</span>
          <span>{node.label}</span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {node.children!.map(childNode => renderTreeNode(childNode, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border rounded-lg p-2">
      {cmsTree.map(node => renderTreeNode(node))}
    </div>
  );
};

export default CmsNavigationTree;
