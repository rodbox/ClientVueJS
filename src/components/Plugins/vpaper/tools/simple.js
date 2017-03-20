new Tool({
  onMouseDown: (e) => {
    path = new Path();
    path.strokeColor = state.colors.active.stroke.hex;
    path.strokeWidth = state.props.stroke.width.value;
    path.add(e.point);
  },
  onMouseDrag: (e) => {
    path.add(e.point);
  }
})