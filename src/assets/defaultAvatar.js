import Image from 'next/image';

const DefaultAvatar = () => {
  return (
    <Image
      src="/path/to/default/avatar.png"
      width={250}
      height={250}
      alt="Default Avatar"
    />
  );
};

export default DefaultAvatar;