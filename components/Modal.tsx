"use client";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import Image from "next/image";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

type ImageModalProps = {
  img: string;
};

const ImageModal: React.FC<ImageModalProps> = ({ img }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <HiMiniViewfinderCircle
        onClick={handleOpen}
        className="text-2xl text-green-600 cursor-pointer"
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={img}
                alt={`${img} not found`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ImageModal;
