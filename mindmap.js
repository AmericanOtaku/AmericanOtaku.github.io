// Input data
const data = {
    nodes: [
      { id: 'A74TOX803D0', label: 'Java Programming for Beginners – Full Course', url: 'https://www.youtube.com/watch?v=A74TOX803D0' },
      { id: '2', label: 'Node 2', url: 'URL2' },
      { id: '3', label: 'Node 3', url: 'URL3' },
      { id: '4', label: 'Node 4', url: 'URL4' },
      { id: '5', label: 'Node 5', url: 'URL5' },
      { id: '6', label: 'Node 6', url: 'URL6' },
      { id: '7', label: 'Node 7', url: 'URL7' },
      { id: '8', label: 'Node 8', url: 'URL8' },
      { id: '9', label: 'Node 9', url: 'URL9' },
      { id: '10', label: 'Node 10', url: 'URL10' }
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '1', target: '4' },
      { source: '2', target: '5' },
      { source: '2', target: '6' },
      { source: '3', target: '7' },
      { source: '3', target: '8' },
      { source: '4', target: '9' },
      { source: '4', target: '10' }
    ]
  };
  
  // Create SVG canvas
  const width = 800;
  const height = 600;
  
  const svg = d3.select('#mindmap')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Initialize force simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.edges).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2));
  
  // Draw links (edges)
  const link = svg.append('g')
    .selectAll('line')
    .data(data.edges)
    .enter()
    .append('line')
    .attr('class', 'link');
  
  // Draw nodes
  const node = svg.append('g')
    .selectAll('g')
    .data(data.nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .on('click', d => window.open(d.url, '_blank'));
  
  node.append('circle')
    .attr('r', 20)
    .call(d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded));
  
  node.append('text')
    .attr('x', 25)
    .attr('y', 5)
    .text(d => d.label);
  
  // Update positions on each simulation tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  
    node
      .attr('transform', d => `translate(${d.x}, ${d.y})`);
  });
  
  // Drag functions
  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  